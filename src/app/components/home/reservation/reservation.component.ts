import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
declare var $: any; // jQuery

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation.component.html'
})
export class ReservationComponent implements AfterViewInit {

  options = [
    { id: 1, text: 'Silver' },
    { id: 2, text: 'Gold' },
    { id: 3, text: 'Diamond Event' },
  ];

  selected: number[] = [];

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Initialize Select2
      $('#multiSelect').select2({
        placeholder: 'Select Event Types',
        allowClear: true,
        data: this.options,
        width: '100%'
      });

    }, 200);


    // Update Angular model on change
    $('#multiSelect').on('change', (e: any) => {
      this.selected = $(e.target).val();
      console.log(this.selected);
    });

    // Refresh AOS after Select2 renders
    import('aos').then(AOS => {
      AOS.refresh();
    });
  }
}