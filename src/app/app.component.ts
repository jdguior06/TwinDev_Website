import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TwinDev';
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  codeSnippet = `// TwinDev - Solutions
const dev = () => {
  frontend: ['Angular', 'React'],
  backend: ['Spring', 'NestJS'],
  calidad: '100%',
  ubicacion: 'Santa Cruz 🇧🇴'
};

console.log('Sistema listo ✓');`;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      company: [''],
      service: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      try {
        // Configuración de EmailJS (el usuario deberá configurar sus propias credenciales)
        const templateParams = {
          from_name: this.contactForm.value.name,
          from_email: this.contactForm.value.email,
          phone: this.contactForm.value.phone,
          company: this.contactForm.value.company,
          service: this.contactForm.value.service,
          message: this.contactForm.value.message
        };

        // Nota: Reemplazar con tus credenciales de EmailJS
        // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY');
        
        // Simulación de envío exitoso (remover cuando configures EmailJS)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.submitSuccess = true;
        this.contactForm.reset();
      } catch (error) {
        this.submitError = true;
        console.error('Error al enviar:', error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }

  scrollTo(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
