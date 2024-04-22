import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = [];

  // life cycle hook to load appointments from local storage when the page 1st loads
  ngOnInit(): void {
    // checking if local storage has this key - my appointments
    let savedAppointments = localStorage.getItem('my appointments');

    // if key is there, than convert JSON string into a JavaScript object or gives an empty array on init
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate,
      };

      this.appointments.push(newAppointment);
      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();

      // in local storage, create a key -my appointments and save our appointments array in that storage
      localStorage.setItem(
        'my appointments',
        JSON.stringify(this.appointments)
      );
    }
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);

    localStorage.setItem('my appointments', JSON.stringify(this.appointments));
  }
}
