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
        const templateParams = {
          from_name: this.contactForm.value.name,
          from_email: this.contactForm.value.email,
          phone: this.contactForm.value.phone,
          company: this.contactForm.value.company || 'No especificado',
          service: this.contactForm.value.service,
          message: this.contactForm.value.message,
          to_email: 'j.d.guior010602@gmail.com'
        };

        // ⚠️ IMPORTANTE: Reemplaza estos valores con tus credenciales de EmailJS
        // 1. Ve a https://www.emailjs.com
        // 2. Crea una cuenta con j.d.guior010602@gmail.com
        // 3. Configura un servicio de Gmail
        // 4. Crea un template
        // 5. Reemplaza los valores abajo:
        
        await emailjs.send(
          'service_egbka5a',      // ⬅️ Reemplazar con tu SERVICE ID
          'template_nrjw2bj',     // ⬅️ Reemplazar con tu TEMPLATE ID
          templateParams,
          'of3td4JM0ZMNktRzc'       // ⬅️ Reemplazar con tu PUBLIC KEY
        );

        // Si aún no has configurado EmailJS, comenta las líneas 52-57 y descomenta esta:
        // await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.submitSuccess = true;
        this.contactForm.reset();
        
        // Enviar también a WhatsApp (opcional)
        // window.open(`https://wa.me/59169087992?text=Nuevo contacto: ${this.contactForm.value.name}`, '_blank');
        
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

  currentYear = new Date().getFullYear();
}