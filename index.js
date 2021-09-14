const contacts = require("./contacts");
const argv = require('yargs').argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case 'list':
        const allContacts = await contacts.listContacts();
        console.table(allContacts);
        break;

      case 'get':
        const contact = await contacts.getContactById(id);
        console.table(contact);
        break;

      case 'add':
        console.log("\nAdding a contact...");

        await contacts.addContact(name, email, phone,)
          .then(console.table);

        console.log("\nThe contact has been successfully added.");

        await contacts.listContacts()
          .then(console.table);
        break;

      case 'remove':
        console.log("\nRemoveing a contact...");
        await contacts.getContactById(id)
          .then(console.table);

        await contacts.removeContact(id)
          .then(console.table);

        await contacts.listContacts()
          .then(console.table);
        break;

      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  } catch (error) {
    console.log(`\x1B[31m ${error.message}`);
  };
};

invokeAction(argv);