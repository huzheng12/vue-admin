
import registeredUsers from './registeredUsers'
import business from './business'
import sendMessage from './sendMessage'
import TicketManagement from './TicketManagement'
import recommendUsers from './recommendUsers'

export default {
  registeredUsers,
  business,
  sendMessage,
  ...TicketManagement,
  ...recommendUsers
}
