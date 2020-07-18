import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Axios from 'axios';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        margin: "0 auto",
        marginTop: 10,
        backgroundColor: theme.palette.background.paper,
    },
}));

const Projects = () => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);
    const [projects, setProjects] = React.useState([]);
    const [error, setError] = React.useState();
    const { push } = useHistory();

    const handleToggle = (value) => () => {
        
        Axios.put(`https://node-api-challenge-mannie.herokuapp.com/api/projects/${value.id}`, {name: value.name, description: value.description, completed: !value.completed})
            .then(res => {
                setProjects(projects.map(project => {
                    if(project.id === res.data.id) {
                        return res.data;
                    }
                    return project;
                }))
            })
            .catch(err => {
                console.log(err);
            });
    };

    React.useEffect(() => {
        Axios.get("https://node-api-challenge-mannie.herokuapp.com/api/projects")
            .then(res => {
                setProjects(res.data);
                setError(null);
            })
            .catch(err => {
                setError(err);
            });
    }, []);

    
    return (
        <List className={classes.root}>
            {projects.length > 0 && projects.map(project => {

                return (
                <ListItem key={project.id} role={undefined} dense button onClick={handleToggle(project)}>
                    <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={project.completed}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': project.id }}
                    />
                    </ListItemIcon>
                    <ListItemText id={project.id} primary={project.name} />
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="actions" onClick = {() => push(`/${project.id}`)}>
                        <CommentIcon />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                );
            })}
    </List>
    );
};

export default Projects;