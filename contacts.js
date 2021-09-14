const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(allContacts);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find(item => item.id === contactId);

  if (!contact) {
    throw new Error("Contact not found.")
  };

  return contact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(item => item.id === contactId);

  if (idx < 0) {
    throw new Error("Contact not found.")
  };

  allContacts.splice(idx, 1);
  await updateContacts(allContacts);
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };

  allContacts.push(newContact);
  await updateContacts(allContacts);

  return newContact;
};

const updateContacts = async (newContacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};