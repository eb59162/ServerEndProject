const users = [
    {
        id: '2323', 
        name: "Shalom",
        email: "Shalom@.com",
    },
    {
        id: '59776',
        name: "David",
        email: "David@.com",
    },
    {
        id: '534', 
        name: "Meir",
        email: "Meir@.com",

    }, 
    {
        id: '586',
        name: "Chaim",
        email: "Chaim@.com",
    },
]
describe('Controller user', () => {
    test('add user successful', () => {
        
          expect(users.length).not.to.equal(0);
    });
  });