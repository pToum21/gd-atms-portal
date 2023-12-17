const { Ticket } = require('../models');

const ticketData = [
    {
        id: 1,
        title: 'Machine down',
        description: 'The machine is down and has an error on the screen, it didnt take any money or charge my card but it is not working',
        status: 'open',
        date_created: 'march 2, 2022',
        user_id: 2
    },
    {
        id: 2,
        title: 'Machine Took my card',
        description: 'The machine stole my card please help!',
        status: 'open',
        date_created: 'march 2, 2022',
        user_id: 3
    },
    

]