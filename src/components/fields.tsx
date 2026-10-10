import type { ReactNode } from 'react'
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerHexInput,
  ColorPickerHue,
  ColorPickerTrigger,
} from '@/components/motion/color-picker'
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
      <ColorPicker
        aria-label={`${label} color`}
        alpha={false}
        value={valid ? `#${value.toLowerCase()}` : '#000000'}
        onValueChange={(hex) => onChange(hex.slice(1).toUpperCase())}
        className="max-w-none has-[>[data-color-picker-trigger]]:w-full has-[>[data-color-picker-trigger]]:self-stretch"
      >
        <ColorPickerTrigger className="w-full bg-card" />
        <ColorPickerContent className="w-full min-w-64">
          <ColorPickerArea />
          <ColorPickerHue />
          <div className="flex items-center gap-2">
            <ColorPickerHexInput />
            <ColorPickerEyeDropper />
          </div>
        </ColorPickerContent>
      </ColorPicker>
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
