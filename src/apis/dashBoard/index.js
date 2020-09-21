import user from './user'
import otc from './otc'
import exchange from './exchange'
export default{
    ...user,
    ...otc,
    ...exchange
}