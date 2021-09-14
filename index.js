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

        console.table(await contacts.addContact(name, email, phone,));
        console.table(await contacts.listContacts());
        console.log("The contact has been successfully added");
        break;

      case 'remove':
        console.log("\nRemoveing a contact...");
        console.table(await contacts.getContactById(id));

        await contacts.removeContact(id);

        console.table(await contacts.listContacts());
        console.log("The contact has been successfully removed");
        break;

      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  } catch (error) {
    console.log(error.message);
  };
};

invokeAction(argv);