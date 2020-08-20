import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DoneIcon from "@material-ui/icons/AssignmentTurnedIn";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "",
  },
}));

export default function CardComponent(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleOptionDelete = () => {
  //   // Usuwanie konkretnego taska.
  //   props.handleDeleteTask(anchorEl.id);
  //   setAnchorEl(undefined);
  // };

  const handleMiniMenu = (kind) => {
    // Funkcja do obslugi mini menu (Edycja, Usun)
    props.handleTaskStatus(anchorEl.id, kind);
    setAnchorEl(undefined);
  };

  const handleTaskIcons = (e, kind) => {
    // Funkcja do obslugi mini menu (Edycja, Usun)
    // props.handleTaskStatus(id, kind);

    props.handleTaskStatus(e.currentTarget.id, kind);
    setAnchorEl(undefined);
  };

  const tasks = props.tasks;

  return (
    <Grid container spacing={1}>
      {tasks.map((task, id) => {
        if (task.deleted !== true && task.done !== true) {
          return (
            <Grid item xs={12} style={{ marginTop: 10 }}>
              <Card key={`tasks_${id}`}>
                <CardHeader
                  avatar={<Avatar src="/broken-image.jpg" />}
                  action={
                    <IconButton id={id} onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={task.kind}
                  subheader={task.date}
                />
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/paella.jpg"
                  title="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {task.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="add to favorites"
                    id={id}
                    onClick={(e, kind) => {
                      handleTaskIcons(e, "like");
                    }}
                  >
                    <FavoriteIcon color={task.liked ? "secondary" : ""} />
                  </IconButton>
                  <IconButton
                    aria-label="done"
                    id={id}
                    onClick={(e, kind) => {
                      handleTaskIcons(e, "done");
                    }}
                  >
                    <DoneIcon />
                  </IconButton>
                </CardActions>
              </Card>

              <Menu
                id="options-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  id={id}
                  onClick={(kind) => {
                    handleMiniMenu("edit");
                  }}
                >
                  Edytuj
                </MenuItem>
                <MenuItem
                  id={id}
                  onClick={(kind) => {
                    handleMiniMenu("delete");
                  }}
                >
                  Usun
                </MenuItem>
              </Menu>
            </Grid>
          );
        }
      })}
    </Grid>
  );
}