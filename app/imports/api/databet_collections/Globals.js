
/*
 * This is a CLIENT-SIDE-ONLY collection that stores globals
 * It's basically like a Session, but cleaner. It's also great
 * for reactivity!
 */

export const Globals = new Mongo.Collection(null);

Globals.attachSchema(new SimpleSchema({
  name: {
    type: String,
    optional: false,
  },
  value: {
    type: String,
    optional: true,
  },
}));





