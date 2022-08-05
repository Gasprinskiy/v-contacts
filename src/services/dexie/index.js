import Dexie from 'dexie';

export const db = new Dexie('contactsDb');
db.version(2).stores({
  contacts: '++id, fullname, surname, name, patronymic, otherwords, phonenumber, email, group', 
});