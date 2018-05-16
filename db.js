import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';
// import Faker from 'faker/locale/ru'
// import Faker from 'faker/locale/en_US'

const Conn = new Sequelize(
    'relay',
    'dev',
    'dev',
    {
        dialect: 'postgres',
        operatorsAliases: false
    }
);

const Person = Conn.define('person', {
    firstName: {
        type:Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type:Sequelize.STRING,
        allowNull: false
    },
    email: {
        type:Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

const Post = Conn.define('post', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Person.hasMany(Post);
Post.belongsTo(Person);

Conn.sync({force: false}).then(()=>{
    _.times(10000, ()=>{
        Person.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email()
        }).then(person => {
            return person.createPost({
                title: `Title by ${person.firstName}`,
                // content: 'The content of the post by the respective author'
                // content: Faker.lorem.paragraph(3)
                content: _.truncate(Faker.lorem.sentences(9), {
                    // 'length': 254,
                    'length': 65535,
                    'separator': ' '
                  })
                
                // content: Faker.lorem.sentence(7, 12)
            });
        });
    });
});
