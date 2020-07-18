import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        padding: 10
    },
    root: {
        maxWidth: 345,
        margin: "0 auto",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


const ProjectDetails = ({ match }) => {
    const { id } = match.params;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [project, setProject] = React.useState({});
    const [error, setError] = React.useState()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    React.useEffect(() => {
        Axios.get(`https://node-api-challenge-mannie.herokuapp.com/api/projects/${id}`)
            .then(res => {
                setProject(res.data);
                setError(null);
            })
            .catch(err => {
                setError(err);
            });
    }, [id]);

    return (
        <div className = {classes.container}>
            {Object.keys(project).length > 0 && (
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {project.name[0]}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={project.name}
                        subheader={project.completed ? "Status: Completed" : "Status: Not Completed"}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {project.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Steps to Take:</Typography>
                            {project.actions.map((action, index) => (
                                <React.Fragment key = {action.id}>
                                    <Typography>
                                        {`- ${action.description}`}
                                        <br />
                                        <br />
                                        {action.notes}
                                        <br />
                                    </Typography>                                    
                                    {index < project.actions.length - 1 && <hr />}
                                </React.Fragment>
                            ))}
                            
                        </CardContent>
                    </Collapse>
                </Card>
            )}
        </div>
    );
};

export default ProjectDetails;