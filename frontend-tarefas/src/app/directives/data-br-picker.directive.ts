import {
  AfterViewInit,
  Directive,
  ElementRef,
  forwardRef,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import flatpickr from 'flatpickr';
import { Instance } from 'flatpickr/dist/types/instance';
import 'flatpickr/dist/l10n/pt.js';

@Directive({
  selector: 'input[appDataBrPicker]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DataBrPickerDirective),
      multi: true,
    },
  ],
  host: {
    readonly: 'true',
    autocomplete: 'off',
  },
})
export class DataBrPickerDirective implements ControlValueAccessor, AfterViewInit, OnDestroy {
  private picker?: Instance;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private readonly element: ElementRef<HTMLInputElement>) {}

  ngAfterViewInit(): void {
    this.picker = flatpickr(this.element.nativeElement, {
      locale: flatpickr.l10ns.pt,
      enableTime: true,
      time_24hr: true,
      dateFormat: 'd/m/Y H:i',
      allowInput: false,
      disableMobile: false,
      monthSelectorType: 'dropdown',
      onChange: (_dates, dateStr) => {
        this.onChange(dateStr);
      },
      onClose: () => this.onTouched(),
    });
  }

  ngOnDestroy(): void {
    this.picker?.destroy();
  }

  writeValue(value: string | null): void {
    if (!this.picker) return;

    if (!value) {
      this.picker.clear();
      return;
    }

    const data = this.parseBr(value);
    if (data) {
      this.picker.setDate(data, false);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (!this.picker) return;

    if (isDisabled) {
      this.picker.close();
      this.element.nativeElement.disabled = true;
    } else {
      this.element.nativeElement.disabled = false;
    }
  }

  private parseBr(valor: string): Date | null {
    const match = valor.trim().replace(',', '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})$/);
    if (!match) return null;

    const data = new Date(
      Number(match[3]),
      Number(match[2]) - 1,
      Number(match[1]),
      Number(match[4]),
      Number(match[5]),
    );

    return Number.isNaN(data.getTime()) ? null : data;
  }
}
