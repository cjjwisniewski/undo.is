export interface ContactModalOptions {
  heading?: string;
  subject?: string;
  domain?: string;
}

class ContactModalStore {
  open = $state(false);
  heading = $state("Get in Touch");
  subject = $state("General Inquiry");
  domain = $state("");

  show(options: ContactModalOptions = {}) {
    this.heading = options.heading || "Get in Touch";
    this.subject = options.subject || "General Inquiry";
    this.domain = options.domain || "";
    this.open = true;
  }

  close() {
    this.open = false;
  }
}

export const contactModal = new ContactModalStore();

export function openContactModal(options: ContactModalOptions = {}) {
  contactModal.show(options);
}

export function closeContactModal() {
  contactModal.close();
}
