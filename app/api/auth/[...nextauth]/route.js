import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'

// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'

export const athoptions = NextAuth({
  providers: [
    // OAuth authentication providers...

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),


    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
  
// callbacks: {
//   async signIn({ user, account, profile, email, credentials }) {
//     if(account.provider=="github"){
      
//     // connect to database
//     const client = await mongoose.connect()
//     // Check if user already in database
//     const currentUser = await client.db('users').collection('users').findOne({email: email })
//   }
//   }
// }
})

export {athoptions as GET, athoptions as POST}
























// export async function GET(request) {}
 
// export async function HEAD(request) {}
 
// export async function POST(request) {}
 
// export async function PUT(request) {}
 
// export async function DELETE(request) {}
 
// export async function PATCH(request) {}
 
// // If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and set the appropriate Response `Allow` header depending on the other methods defined in the Route Handler.
// export async function OPTIONS(request) {}