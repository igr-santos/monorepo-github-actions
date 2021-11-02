Based on JWT authentication

- [] user
- [] permissions
- [] login
- [] logout

interface Session {
  data?: any
  token?: string
  permissions: string[]
}

Provider:
* fetchSession: () => Promise<Session>