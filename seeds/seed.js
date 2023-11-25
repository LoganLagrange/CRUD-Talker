const sequelize = require(`../config/connection`);
const {User, Message, Conversation} = require(`../models`);

const userData = [
    {
        username: `fatmanatee0`,
        name: `Logan Lagrange`,
        password: `password`,
        email: `lagrangelogan@gmail.com`
    },
    {
        username: `nillows`,
        name: `Thom Wollin`,
        password: `password`,
        email: ``
    },
    {
        username: `Spec-Tr`,
        name: `Spencer Tyber`,
        password: `password`,
        email: ``
    },
    {
        username: `Ren3546`,
        name: `Renato Valdez`,
        password: `password`,
        email: ``
    }
]

const messageData = [
    {
        content: `Hello everyone`,
        sender_id: 1,
        conversation_id: 1
    }
]

const conversationData = [
    {
        conversationName: `Test Conversation`
    }
]

const seedMe = async()=>{
    await sequelize.sync({force:true});
    
    const dbUsers = await User.bulkCreate(userData,{
        individualHooks: true
    });
    console.table(dbUsers.map(user=>user.toJSON()));

    const dbConversation = await Conversation.bulkCreate(conversationData);
    console.table(dbConversation.map(conversation=>conversation.toJSON()));

    const dbMessage = await Message.bulkCreate(messageData);
    console.table(dbMessage.map(message=>message.toJSON()));

    await dbUsers[0].addConversation(1);

    await dbConversation[0].addUsers([1,2]);

    process.exit(0);
}

seedMe();