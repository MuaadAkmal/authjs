


after User Setting use the update function from NextAuth and set User or useSession returns a an update 
const {update} = useSession()

const {handle , signIn , signOut , update} = NextAuth()

update({name: 'new name' , .........}) 