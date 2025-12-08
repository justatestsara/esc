export type Language = 'en' | 'de'

export interface Translations {
  header: { title: string; postAd: string; language: string }
  filters: { allCountries: string; allCities: string; gender: { label: string; female: string; male: string; trans: string } }
  models: { showingClosest: string; noModelsFound: string; kmAway: string }
  footer: { copyright: string }
  ad: { about: string; contact: string; services: string; rates: string; basicInfo: { gender: string; age: string; hairColor: string; languages: string }; contactMethods: { phone: string; whatsapp: string; telegram: string; email: string } }
  postAd: { title: string; name: string; country: string; city: string; age: string; phone: string; email: string; whatsapp: string; telegram: string; instagram: string; twitter: string; description: string; gender: string; hairColor: string; languages: string; services: string; rates: string; images: string; submit: string; required: string; minChars: string }
  admin: { login: { title: string; username: string; password: string; submit: string; error: string }; dashboard: { title: string; stats: { live: string; pending: string; inactive: string; contactMessages: string }; ads: { pending: string; approved: string; inactive: string }; contact: { pending: string; reviewed: string }; actions: { approve: string; reject: string; deactivate: string; activate: string; delete: string; markReviewed: string } } }
  imprint: { title: string; legalInfo: string; contactUs: string; form: { name: string; subject: string; message: string; submit: string; success: string } }
}

export const translations: Record<Language, Translations> = {
  en: {
    header: { title: 'ESCORT.DE', postAd: 'Post Ad', language: 'Language' },
    filters: { allCountries: 'All Countries', allCities: 'All Cities', gender: { label: 'Gender', female: 'Female', male: 'Male', trans: 'Trans' } },
    models: { showingClosest: 'Showing models closest to your location', noModelsFound: 'No models found matching your filters.', kmAway: 'km away' },
    footer: { copyright: '© 2025 Escort.de. All rights reserved.' },
    ad: { about: 'About', contact: 'Contact Information', services: 'Services', rates: 'Rates', basicInfo: { gender: 'Gender', age: 'Age', hairColor: 'Hair Color', languages: 'Languages' }, contactMethods: { phone: 'Phone', whatsapp: 'WhatsApp', telegram: 'Telegram', email: 'Email' } },
    postAd: { title: 'Post Your Ad', name: 'Name', country: 'Country', city: 'City', age: 'Age', phone: 'Phone', email: 'Email', whatsapp: 'WhatsApp', telegram: 'Telegram', instagram: 'Instagram', twitter: 'Twitter', description: 'Description', gender: 'Gender', hairColor: 'Hair Color', languages: 'Languages', services: 'Services', rates: 'Rates', images: 'Images', submit: 'Submit Ad', required: 'Required', minChars: 'Minimum 50 characters' },
    admin: { login: { title: 'Admin Login', username: 'Username', password: 'Password', submit: 'Login', error: 'Invalid credentials' }, dashboard: { title: 'Admin Dashboard', stats: { live: 'Live Ads', pending: 'Pending Ads', inactive: 'Inactive Ads', contactMessages: 'Contact Messages' }, ads: { pending: 'Pending Ads', approved: 'Approved Ads', inactive: 'Inactive Ads' }, contact: { pending: 'Pending Contact Messages', reviewed: 'Reviewed Contact Messages' }, actions: { approve: 'Approve', reject: 'Reject', deactivate: 'Deactivate', activate: 'Activate', delete: 'Delete', markReviewed: 'Mark as Reviewed' } } },
    imprint: { title: 'Imprint & Contact', legalInfo: 'Legal Information', contactUs: 'Contact Us', form: { name: 'Your Name', subject: 'Subject', message: 'Message', submit: 'Send Message', success: 'Thank you! Your message has been received and will be reviewed shortly.' } }
  },
  de: {
    header: { title: 'ESCORT.DE', postAd: 'Anzeige aufgeben', language: 'Sprache' },
    filters: { allCountries: 'Alle Länder', allCities: 'Alle Städte', gender: { label: 'Geschlecht', female: 'Weiblich', male: 'Männlich', trans: 'Trans' } },
    models: { showingClosest: 'Zeige Modelle in Ihrer Nähe', noModelsFound: 'Keine Modelle gefunden, die Ihren Filtern entsprechen.', kmAway: 'km entfernt' },
    footer: { copyright: '© 2025 Escort.de. Alle Rechte vorbehalten.' },
    ad: { about: 'Über', contact: 'Kontaktinformationen', services: 'Leistungen', rates: 'Preise', basicInfo: { gender: 'Geschlecht', age: 'Alter', hairColor: 'Haarfarbe', languages: 'Sprachen' }, contactMethods: { phone: 'Telefon', whatsapp: 'WhatsApp', telegram: 'Telegram', email: 'E-Mail' } },
    postAd: { title: 'Anzeige aufgeben', name: 'Name', country: 'Land', city: 'Stadt', age: 'Alter', phone: 'Telefon', email: 'E-Mail', whatsapp: 'WhatsApp', telegram: 'Telegram', instagram: 'Instagram', twitter: 'Twitter', description: 'Beschreibung', gender: 'Geschlecht', hairColor: 'Haarfarbe', languages: 'Sprachen', services: 'Leistungen', rates: 'Preise', images: 'Bilder', submit: 'Anzeige absenden', required: 'Pflichtfeld', minChars: 'Mindestens 50 Zeichen' },
    admin: { login: { title: 'Admin-Anmeldung', username: 'Benutzername', password: 'Passwort', submit: 'Anmelden', error: 'Ungültige Anmeldedaten' }, dashboard: { title: 'Admin-Dashboard', stats: { live: 'Aktive Anzeigen', pending: 'Ausstehende Anzeigen', inactive: 'Inaktive Anzeigen', contactMessages: 'Kontaktnachrichten' }, ads: { pending: 'Ausstehende Anzeigen', approved: 'Genehmigte Anzeigen', inactive: 'Inaktive Anzeigen' }, contact: { pending: 'Ausstehende Kontaktnachrichten', reviewed: 'Überprüfte Kontaktnachrichten' }, actions: { approve: 'Genehmigen', reject: 'Ablehnen', deactivate: 'Deaktivieren', activate: 'Aktivieren', delete: 'Löschen', markReviewed: 'Als überprüft markieren' } } },
    imprint: { title: 'Impressum & Kontakt', legalInfo: 'Rechtliche Informationen', contactUs: 'Kontaktieren Sie uns', form: { name: 'Ihr Name', subject: 'Betreff', message: 'Nachricht', submit: 'Nachricht senden', success: 'Vielen Dank! Ihre Nachricht wurde erhalten und wird in Kürze überprüft.' } }
  }
}