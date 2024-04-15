import { messagesCollection } from '../utilities/firebaseInit'
const cron = require('node-cron')

//Schedule tasks to be run on the server
export const scheduleCron = () => {
    cron.schedule('*/30 * * * * *', function() {
        console.log('Deleting old messages every 30s.')
    
        //Deleter action, takes in a unix timestamp and deletes
        //everything older than that
        const expiryTime = Number(process.env.message_duration) //Set to 1 minute for testing purposes
    
        const q = messagesCollection.orderByChild('timeSent').endAt(Date.now() - expiryTime)
        
        q.on('value', (querySnapshot)=> {
            querySnapshot.forEach(async (doc) => {
                //Delete the doc here
                console.log(doc.uid)
                await doc.ref.delete().then(() => {
                    console.log("Document successfully deleted!")
                }).catch((error) => {
                    console.error("Error removing document:", error)
                })
            })
        })
    })
}


