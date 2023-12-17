## [Final draft of UI (Figma)](https://www.figma.com/file/2mvddKeA4XMODdCidYkDid/Proximity-Chat-App?type=design&node-id=0%3A1&mode=design&t=V5A9MVRhlmdxGH0M-1)
## Views
* Message view 
* Settings view

## Components

### MessageBoard

- [ ] MessageBoard
    * Child components: 
        * Message collection
        * MessageInputField
    * Properties:
        * (int) NearbyUserCount

- [x] Message
    * Child components:
        * UserProfilePicture
    * Properties:
        * (string) Message content
        * (string) UserId
        * (string) UserName
        * (string) Timestamp

- [ ] MessageInputField
    * Child components:
        * N/A
    * Properties:
        * (string) The message input

### Banner

- [ ] Banner
    * Child components:
        * ClientUserStatus
        * ActiveUsers
    * Properties:
        * N/A

- [ ] ClientUserStatus 
    * Child components:
        * UserProfilePicture
    * Properties
        * (string) nearby location
        * UserName
        * UserProfilePicture

- [ ] ActiveUsers
    * Child components:
        * UserBadge collection
    * Properties:
        * (bool) UsersAreNearby
            * A message will need to be displayed if there are no users nearby

- [ ] UserBadge
    * Child componenets:
        * UserProfilePicture
    * Properties:
        * UserId
        * UserName
