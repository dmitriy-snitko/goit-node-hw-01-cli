const contacts = require("./contacts");
const argv = require('yargs').argv;

let allContacts = [];

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case 'list':
        allContacts = await contacts.listContacts();
        console.table(allContacts);
        break;

      case 'get':
        const contact = await contacts.getContactById(id);
        console.table(contact);
        break;

      case 'add':
        const addedContact = await contacts.addContact(name, email, phone,);
        allContacts = await contacts.listContacts();

        console.log("\nAdding a contact...");
        console.table(addedContact);
        console.log("\nThe contact has been successfully added.");
        console.table(allContacts);
        break;

      case 'remove':
        const removedContact = await contacts.getContactById(id);

        await contacts.removeContact(id);

        allContacts = await contacts.listContacts();

        console.log("\nRemoveing a contact...");
        console.table(removedContact);
        console.log("\nThe contact has been successfully removed.");
        console.table(allContacts);
        break;

      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  } catch (error) {
    console.log(`\x1B[31m ${error.message}`);
  };
};

invokeAction(argv);