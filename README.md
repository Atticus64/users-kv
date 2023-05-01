# Users Deno Kv 🦕

Ejemplo practico de Deno Kv

Crud con usuarios

* Usuario

```ts
interface User {
	name: string,
	role: Enum [ADMIN or USER]
	langs: [strings]
	username: string
	age: number
}
```

## Obtener todos los usuarios

```ts
const resp = await fetch('https://fazt-users-kv.deno.dev/users')

const users = await resp.json()
```

## Crear un nuevo usuario

* Endpoint

```
https://fazt-users-kv.deno.dev/users
```

```ts
const data = { 
	"name": "Midudev", 
	"age": 38, 
	"role": "USER",
	"langs": ["JavaScript", "Typescript", "Rust"], 
	"username": "midu" 
}

await fetch('https://fazt-users-kv.deno.dev/users', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	}
	body: JSON.stringify(data)
})
```

## Actualizar usuario 

```ts
const data = { 
	"name": "Miguel", 
	"age": 38, 
	"role": "USER",
	"langs": ["JavaScript", "Typescript", "Rust"], 
	"username": "midu" 
}

await fetch('https://fazt-users-kv.deno.dev/users/id', {
	method: 'PUT',
	headers: {
		'Content-Type': 'application/json',
	}
	body: JSON.stringify(data)
})
```


## Eliminar un Usuario

```ts
await fetch('https://fazt-users-kv.deno.dev/users/id', {
	method: 'DELETE',
})
```

