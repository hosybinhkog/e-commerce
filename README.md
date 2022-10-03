```bash
npm run dev
# or
yarn dev
```

## HOSYBINHKOG HO SY BINH

#### 11.9.2022 build layout-main

### DATABASE

---

**Product**

- id: String Or Number
- name: String
- categoryId: String Or Number
- img[] -> { public_id: string, url: string }
- userId: --> ref(user.id)
- comments: commnentProducts[] -> ref(commentProduct.id)
- price: number
- categoryId:
- Stock
- rating
- numOfReviews
- reviews: { username, usser, comment, rating }
- createdAt: Date
- updatedAt: Date

**User**

- id: String or Number
- createdAt: Date
- updatedAt: Date
- deletedAt: Date | undefined
- usernameOrEmail: string
- isGoogle: boolean
- password: string ---> Hash Brypto or Argon2
- email: string
- avatar : { public_id: string, url: string }
- roles: string[]
- phone: string
- address: string
- resetPassowdToken: string
- resetPasswordExpire

**Post**

- title: string
- description: string
- snip: string
- userId: string
- comments: commentPost[]
- author: String
- createdAt: Date
- updatedAt: Date
- thumb: String
- body: string ---> String HTML --> editor

**Comment Product**

- id: String or Number
- createdAt: Date
- updatedAt: Date
- productID: ID
- content: String
- username: String
- userId: ID

**Comment Post**

- id: String or Number
- createdAt: Date
- updatedAt: Date
- postID: ID
- content: String
- username: String
- userId: ID

**Vote Comment Product**

- id: String Or Number
- createdAt: Date
- productId: ID
- upvote: boolean
- userId: ID

**Vote Comment Post**

- id: String Or Number
- createdAt: Date
- postId: ID
- upvote: boolean
- userId: ID

**Category**

- id: String or number
- username: String
- createdAt: string
- updatedAt: string
- title: String
- descript: string
- userId: string
- thumb: string

**Order**

- shippingInfo : { address, city, state, country, pinCode, phoneNo }
- orderItems: { name, price, quantity, image, product }[]
- id: String Or Number
- user: ObjectId
- paymentInfo: { id, status }
- paidAt: Date
- itemsPrice: 0
- taxPrice: Number
- shippingPrice: Number
- totalPrice: Number
- orderStatus: string
- createdAt: Date
- updatedAt: Date

---

## **Qua trinh lam do an**

- 22/9 Database design

---

## **Nhan xet cua giang vien**
