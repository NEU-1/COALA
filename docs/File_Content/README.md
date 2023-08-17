# 파일 구조도

나중에 독스로 따로 빼두는게 좋을 것 같습니다.
```
\---src
    +---.idea
    +---backend
    |   +---chatserver
    |   |   +---public
    |   |   \---src
    |   |       +---db
    |   |       |   +---bucket
    |   |       |   +---mongo
    |   |       |   |   \---query
    |   |       |   \---mysql
    |   |       |       \---query
    |   |       +---lib
    |   |       +---models
    |   |       |   +---chat
    |   |       |   \---contract
    |   |       +---pages
    |   |       |   \---api
    |   |       |       +---chat
    |   |       |       \---contract
    |   |       +---scripts
    |   |       +---styles
    |   |       \---types
    |   \---src
    |       +---main
    |       |   +---java
    |       |   |   \---com
    |       |   |       \---coala
    |       |   |           \---backend
    |       |   |               +---auction
    |       |   |               |   +---api
    |       |   |               |   |   +---controller
    |       |   |               |   |   \---service
    |       |   |               |   \---db
    |       |   |               |       +---dto
    |       |   |               |       |   \---response
    |       |   |               |       +---entity
    |       |   |               |       \---repository
    |       |   |               +---community
    |       |   |               |   +---common
    |       |   |               |   |   +---dto
    |       |   |               |   |   \---exception
    |       |   |               |   +---freepost
    |       |   |               |   |   +---api
    |       |   |               |   |   |   +---controller
    |       |   |               |   |   |   \---service
    |       |   |               |   |   \---db
    |       |   |               |   |       +---dto
    |       |   |               |   |       |   +---request
    |       |   |               |   |       |   \---response
    |       |   |               |   |       +---entity
    |       |   |               |   |       \---repository
    |       |   |               |   +---notice
    |       |   |               |   |   +---api
    |       |   |               |   |   |   +---controller
    |       |   |               |   |   |   \---service
    |       |   |               |   |   \---db
    |       |   |               |   |       +---dto
    |       |   |               |   |       |   +---request
    |       |   |               |   |       |   \---response
    |       |   |               |   |       +---entity
    |       |   |               |   |       \---repository
    |       |   |               |   \---techpost
    |       |   |               |       +---api
    |       |   |               |       |   +---controller
    |       |   |               |       |   \---service
    |       |   |               |       \---db
    |       |   |               |           +---dto
    |       |   |               |           |   +---request
    |       |   |               |           |   \---response
    |       |   |               |           +---entity
    |       |   |               |           \---repository
    |       |   |               +---data
    |       |   |               +---freepost
    |       |   |               |   \---api
    |       |   |               |       \---controller
    |       |   |               +---member
    |       |   |               |   +---api
    |       |   |               |   |   +---controller
    |       |   |               |   |   \---service
    |       |   |               |   +---common
    |       |   |               |   |   +---config
    |       |   |               |   |   +---jwt
    |       |   |               |   |   \---model
    |       |   |               |   \---db
    |       |   |               |       +---dto
    |       |   |               |       |   +---request
    |       |   |               |       |   \---response
    |       |   |               |       +---entity
    |       |   |               |       \---repository
    |       |   |               +---mypage
    |       |   |               |   +---api
    |       |   |               |   |   +---controller
    |       |   |               |   |   \---service
    |       |   |               |   \---db
    |       |   |               |       +---dto
    |       |   |               |       |   \---response
    |       |   |               |       \---repository
    |       |   |               +---product
    |       |   |               |   \---db
    |       |   |               |       +---entity
    |       |   |               |       \---repository
    |       |   |               +---s3
    |       |   |               +---store
    |       |   |               |   +---api
    |       |   |               |   |   +---controller
    |       |   |               |   |   \---service
    |       |   |               |   \---db
    |       |   |               |       +---dto
    |       |   |               |       |   \---response
    |       |   |               |       +---entity
    |       |   |               |       \---repository
    |       |   |               \---techpost
    |       |   |                   \---api
    |       |   |                       \---controller
    +---database
    \---frontend
        +---public
        |   \---assets
        |       \---images
        \---src
            +---api
            |   +---javaserver
            |   \---nodeServer
            |       +---Chat
            |       +---Room
            |       \---socketIO
            +---assets
            +---components
            |   +---Auction
            |   |   \---components
            |   +---Chat
            |   |   +---components
            |   |   \---containers
            |   +---Common
            |   |   \---containers
            |   +---Contract
            |   |   +---components
            |   |   \---containers
            |   +---Freeboard
            |   |   \---components
            |   +---Home
            |   +---Login
            |   +---MyPage
            |   |   +---components
            |   |   \---containers
            |   +---SellBoard
            |   |   \---img
            |   +---SignUp
            |   |   \---containers
            |   +---Store
            |   |   \---components
            |   +---Techboard
            |   |   \---components
            |   \---Userupdate
            +---hooks
            |   \---chatting
            +---lib
            |   \---api
            +---pages
            +---routes
            |   \---containers
            +---store
            +---styles
            \---utils

```