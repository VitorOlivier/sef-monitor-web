import React, { useState } from 'react';
//import logo from '../../img/logo250x250.png';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  list: {
    width: 250,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialogFilter(props) {
  const classes = useStyles();
  const { open, setOpen, filter, setFilter } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const serviceHandleChange = event => {
    setFilter({ ...filter, servico: event.target.value });
  };

  const localHandleChange = event => {
    setFilter({ ...filter, local: event.target.value });
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Filtrar
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Salvar
            </Button>
          </Toolbar>
        </AppBar>
        <FormControl className={classes.formControl}>
          <InputLabel id="service-simple-select-label">Serviço</InputLabel>
          <Select
            labelId="service-simple-select-label"
            id="service-simple-select"
            value={filter.servico}
            onChange={serviceHandleChange}
          >
            <MenuItem value={'Concessão Cartão Residência (UE)'}>Concessão Cartão Residência (UE)</MenuItem>
            <MenuItem value={'Renovação Título Residência'}>Renovação Título Residência</MenuItem>
          </Select>
        </FormControl>
        <Divider />
        <FormControl className={classes.formControl}>
          <InputLabel id="local-simple-select-label">Local</InputLabel>
          <Select
            labelId="local-simple-select-label"
            id="local-simple-select"
            value={filter.local}
            onChange={localHandleChange}
          >
            <MenuItem value={''}> </MenuItem>
            <MenuItem value={'Posto de Atendimento Alverca'}>Posto de Atendimento Alverca</MenuItem>
            <MenuItem value={'Delegação de Vila Real'}>Delegação de Vila Real</MenuItem>
          </Select>
        </FormControl>
        <Divider />
      </Dialog>
    </div>
  );
}

function Header(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { filter, setFilter } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={toggleDrawer('left', true)}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            SEF Monitor
          </Typography>
          <Button color="inherit" onClick={handleClickOpen}>
            Filtrar
          </Button>
        </Toolbar>
        <FullScreenDialogFilter open={open} setOpen={setOpen} filter={filter} setFilter={setFilter} />
        <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
          <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
          >
            <Divider />
          </div>
        </Drawer>
      </AppBar>
    </div>
  );
}

export default Header;
