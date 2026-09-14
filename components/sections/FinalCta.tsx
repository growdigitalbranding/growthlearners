'use client';

import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import WhatsAppCta from '../ui/WhatsAppCta';
import { reveal, stagger, VIEWPORT } from '@/lib/motion';
import { SITE, batchStartDisplay, telLink } from '@/lib/site';
import { track } from '@/lib/analytics';
import { FIELD_ORDER, validateField, validateForm } from '@/lib/validation';

type Status = 'idle' | 'sending' | 'done' | 'error';

/**
 * Three fields. Everything else is a conversation — which is the point of
 * making WhatsApp the dominant action and the form the quiet alternative.
 */
export default function FinalCta() {
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  /** Put the cursor on the first thing that needs fixing, in reading order. */
  const focusFirstInvalid = useCallback((errors: Record<string, string>) => {
    const first = FIELD_ORDER.find((field) => errors[field]);
    if (!first) return;
    const input = formRef.current?.elements.namedItem(first);
    if (input instanceof HTMLElement) input.focus();
  }, []);

  /**
   * Validate on blur, never on keystroke — telling somebody their phone number
   * is wrong while they are still typing it is just noise. Once a field is
   * showing an error it re-checks on every change, so the message clears the
   * moment it stops being true rather than waiting for another blur.
   */
  const checkField = useCallback((field: 'name' | 'mobile' | 'org', value: string) => {
    const message = validateField(field, value);
    setFieldErrors((previous) => {
      if ((previous[field] ?? '') === message) return previous;
      const next = { ...previous };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  }, []);

  const fieldProps = (field: 'name' | 'mobile' | 'org') => ({
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => checkField(field, event.target.value),
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      if (fieldErrors[field]) checkField(field, event.target.value);
    },
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');

    const data = new FormData(event.currentTarget);
    const payload = {
      name: data.get('name'),
      mobile: data.get('mobile'),
      org: data.get('org'),
      website: data.get('website'),
    };

    // Catch what we can before spending a round trip on it. The server checks
    // the same rules again — this is a courtesy, not the gate.
    const localErrors = validateForm({
      name: String(payload.name ?? ''),
      mobile: String(payload.mobile ?? ''),
    });
    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      setStatus('error');
      focusFirstInvalid(localErrors);
      return;
    }

    setStatus('sending');
    setFieldErrors({});

    try {
      const response = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        const serverErrors = result.fieldErrors ?? {};
        setFieldErrors(serverErrors);
        setFormError(result.error ?? 'Please check the highlighted fields.');
        setStatus('error');
        // Without this, focus stays wherever the submit left it and the error
        // can be off-screen entirely on a phone.
        focusFirstInvalid(serverErrors);
        return;
      }

      track({ event: 'callback_submit', college_or_company: String(payload.org ?? '') });
      setStatus('done');
    } catch {
      setFormError('Something went wrong. Please message us on WhatsApp instead.');
      setStatus('error');
    }
  }

  const inputClass =
    'min-h-[3rem] w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-bg ' +
    'placeholder:text-bg/55 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent';

  return (
    <section
      id="enquire"
      data-dark-section
      className="relative overflow-hidden bg-accent-2 py-section text-bg"
    >
      <div className="grid-lines-dark pointer-events-none absolute inset-0 opacity-70" aria-hidden />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <motion.p variants={reveal} className="eyebrow mb-5 text-bg/65">
              Next batch {batchStartDisplay} · {SITE.seats} seats · {SITE.city}
            </motion.p>
            <motion.h2 variants={reveal} className="max-w-[22ch] text-balance font-serif text-h2 text-bg">
              30 days from now you could still be watching AI tutorials.{' '}
              <span className="text-accent">Or you could have built all of it.</span>
            </motion.h2>
            <motion.p variants={reveal} className="mt-6 max-w-md text-lead text-bg/70">
              Message us on WhatsApp and you will get a straight answer from someone who teaches the
              course, not a sales script. Bring your parents&rsquo; questions too.
            </motion.p>

            <motion.div variants={reveal} className="mt-9">
              <WhatsAppCta
                location="final"
                label="Reserve my seat"
                className="btn-accent w-full !min-h-[3.5rem] text-base sm:w-auto sm:!px-8"
                iconSize={20}
              />
              <p className="mt-4 text-sm text-bg/65">
                Prefer to talk?{' '}
                <a
                  href={telLink}
                  onClick={() => track({ event: 'phone_click', location: 'final' })}
                  className="inline-block min-h-[2.75rem] py-2 text-bg underline decoration-accent decoration-2 underline-offset-4"
                >
                  {SITE.phoneDisplay}
                </a>
              </p>
            </motion.div>
          </motion.div>

          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-7 sm:p-8">
              <h3 className="font-serif text-h3 text-bg">Or ask us to call you</h3>
              <p className="mt-3 text-[0.9375rem] text-bg/65">
                Three fields. We will call within one working day.
              </p>

              <div className="form-swap mt-7" data-open={status !== 'done'}>
                <div>
                  {/* pb-1 keeps the submit button's focus ring inside the
                      panel, which overflow: hidden would otherwise clip. */}
                  <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-4 pb-1">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm text-bg/70">
                      Your name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      {...fieldProps('name')}
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                      className={inputClass}
                      placeholder="Priya R"
                    />
                    {fieldErrors.name && (
                      <p id="name-error" role="alert" className="mt-2 text-sm text-accent-soft">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="mobile" className="mb-2 block text-sm text-bg/70">
                      Mobile
                    </label>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      required
                      {...fieldProps('mobile')}
                      aria-invalid={Boolean(fieldErrors.mobile)}
                      aria-describedby={fieldErrors.mobile ? 'mobile-error' : undefined}
                      className={inputClass}
                      placeholder="98765 43210"
                    />
                    {fieldErrors.mobile && (
                      <p id="mobile-error" role="alert" className="mt-2 text-sm text-accent-soft">
                        {fieldErrors.mobile}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="org" className="mb-2 block text-sm text-bg/70">
                      College or company{' '}
                      <span className="text-bg/60">(optional)</span>
                    </label>
                    <input
                      id="org"
                      name="org"
                      type="text"
                      autoComplete="organization"
                      className={inputClass}
                      placeholder="PSG College of Technology"
                    />
                  </div>

                  {/* Honeypot — hidden from people, irresistible to bots. */}
                  <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  {formError && (
                    <p role="alert" className="text-sm text-accent-soft">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn w-full border border-white/25 text-bg transition-colors
                               hover:border-transparent hover:bg-bg hover:text-ink disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" aria-hidden />
                        Sending
                      </>
                    ) : (
                      'Request a callback'
                    )}
                  </button>
                  </form>
                </div>
              </div>

              <div className="form-swap" data-open={status === 'done'}>
                <div>
                  <p
                    role="status"
                    className="flex items-start gap-3 rounded-xl border border-accent/40 bg-accent/10 p-5 text-bg"
                  >
                    <Check size={20} strokeWidth={2.4} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                    <span>
                      Got it. We will call you within one working day. If you would rather not wait,
                      message us on WhatsApp.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
