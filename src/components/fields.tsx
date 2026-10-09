import type { ReactNode } from 'react'
import { Input } from '@/components/motion/input'
import { RangeSlider } from '@/components/motion/range-slider'
import { clamp, isHex } from '@/lib/cardzera'
import { cn } from '@/lib/utils'

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{title}</h3>
      {children}
    </section>
  )
}

export function FieldLabel({ children, hint, required }: { children: ReactNode; hint?: string; required?: boolean }) {
  return (
    <span className="flex items-baseline gap-1.5 px-1 text-sm font-medium text-foreground">
      {children}
      {required ? <span className="text-destructive">*</span> : null}
      {hint ? <span className="text-xs font-normal text-muted-foreground">{hint}</span> : null}
    </span>
  )
}

const inputClassNames = {
  field: 'bg-card h-10',
  input: 'font-mono text-sm',
}

export function ColorField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string
  hint?: string
  value: string
  onChange: (hex: string) => void
}) {
  const valid = isHex(value)
  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel hint={hint}>{label}</FieldLabel>
      <Input
        aria-label={`${label} color`}
        value={value}
        maxLength={6}
        spellCheck={false}
        autoComplete="off"
        error={value.length > 0 && !valid}
        onChange={(next) => onChange(next.replace(/[^0-9a-fA-F]/g, '').toUpperCase().slice(0, 6))}
        leftIcon={
          <span className="flex items-center gap-2">
            <label
              className="relative block size-5 cursor-pointer overflow-hidden rounded-full border border-foreground/10 shadow-sm"
              style={{ background: valid ? `#${value}` : 'transparent' }}
            >
              <input
                type="color"
                aria-label={`Pick ${label.toLowerCase()} color`}
                value={valid ? `#${value.toLowerCase()}` : '#000000'}
                onChange={(e) => onChange(e.target.value.slice(1).toUpperCase())}
                className="absolute -inset-2 size-[calc(100%+1rem)] cursor-pointer opacity-0"
              />
            </label>
            <span className="font-mono text-sm text-muted-foreground">#</span>
          </span>
        }
        classNames={{
          ...inputClassNames,
          leftIcon: 'pointer-events-auto left-2.5',
          input: cn(inputClassNames.input, 'uppercase pl-[3.25rem]'),
        }}
      />
    </div>
  )
}

export function RangeField({
  label,
  hint,
  min,
  max,
  text,
  fallback,
  onTextChange,
}: {
  label: string
  hint?: string
  min: number
  max: number
  /** Raw text of the numeric box; the slider follows it once it parses. */
  text: string
  fallback: number
  onTextChange: (text: string) => void
}) {
  const parsed = parseInt(text)
  const sliderValue = isNaN(parsed) ? fallback : clamp(parsed, min, max)
  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel hint={hint}>{label}</FieldLabel>
      <div className="flex items-center gap-2.5">
        <RangeSlider
          aria-label={label}
          min={min}
          max={max}
          step={1}
          value={sliderValue}
          showTicks={false}
          onValueChange={(v) => onTextChange(String(v))}
          className="flex-1 bg-card"
        />
        <Input
          aria-label={`${label} value`}
          inputMode="numeric"
          value={text}
          onChange={onTextChange}
          onBlur={() => {
            const v = parseInt(text)
            onTextChange(String(clamp(isNaN(v) ? fallback : v, min, max)))
          }}
          className="w-16 shrink-0"
          classNames={{ ...inputClassNames, input: cn(inputClassNames.input, 'px-0 text-center') }}
        />
      </div>
    </div>
  )
}
