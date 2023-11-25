const User = require(`./User`);
const Message = require(`./Message`);
const Conversation = require(`./Conversation`);

// Message to User associations
Message.belongsTo(User, {
    onDelete: "SET NULL"
});
User.hasMany(Message);

// Message to Conversation associations
Message.belongsTo(Conversation, {
    onDelete:"CASCADE"
});
Conversation.hasMany(Message);

// User conversation junction table
Conversation.belongsToMany(User,{
    through:"UsersConversations"
});
User.belongsToMany(Conversation,{
    through:"UsersConversations"
});

module.exports = {
    User,
    Message,
    Conversation
}