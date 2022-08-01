import Dexie from 'dexie';

export const db = new Dexie('contactsDb');
db.version(1).stores({
  contacts: '++id, fullname, surname, name, patronymic, phonenumber, email, group', 
});