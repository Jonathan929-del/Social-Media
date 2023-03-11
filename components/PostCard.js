// Imports
import moment from 'moment';
import Link from 'next/link';
import {useContext} from 'react';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import {AuthContext} from '../context/auth';
import {Card, Button, Image, Icon, Label, Popup} from 'semantic-ui-react';




// Main Function
const PostCard = ({post:{body, createdAt, id, username, likeCount, commentCount, likes}}) => {

    const {user} = useContext(AuthContext);

  return (
    <Card fluid>
        <Card.Content>
            <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
            />
            <Card.Header>{username}</Card.Header>
            <Card.Meta as={Link} href={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
            <Card.Description>
                {body}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <LikeButton post={{id, likes, likeCount}} user={user}/>
            <Popup inverted content='Comment on post' trigger={
                <Button labelPosition='right' as={Link} href={`/posts/${id}`}>
                    <Button color='blue' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
            }/>
            {user && user.username === username && <DeleteButton postId={id}/>}
        </Card.Content>
    </Card>
  )
};





// Export
export default PostCard;