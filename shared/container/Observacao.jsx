import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { green100, green500, green700 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import * as PacienteActions from '../actions/PacienteActions';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100
  }
}, {
  avatar: {
    borderColor: null
  },
  userAgent: false
});

class Observacao extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  refreshPacientes() {
    let unidade = this.props.params.unidade;
    this.props.selectUnidade(unidade);
    this.props.invalidateUnidade(unidade);
    this.props.fetchPacientesIfNeeded(unidade);
  }

  handleOpen () {
    this.setState({open: true});
  }

  handleClose () {
    this.setState({open: false});
  }

  renderRow (paciente) {
    return(
      <TableRow>
        <TableRowColumn style={{width: '5%'}}>{paciente.leito}</TableRowColumn>
        <TableRowColumn style={{width: '25%'}}>{paciente.nome}</TableRowColumn>
        <TableRowColumn style={{width: '20%'}}>{paciente.medic}</TableRowColumn>
        <TableRowColumn style={{width: '10%'}}>{paciente.convenio}</TableRowColumn>
        <TableRowColumn style={{width: '40%'}}>{paciente.observacao}<IconButton><ModeEdit/></IconButton></TableRowColumn>
      </TableRow>
      );
  }

  componentDidMount() {
    this.refreshPacientes();
  }

  render () {
    const {pacientes} = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div style={{padding: '20px'}}>
        <Dialog
          title="Editar - Observação"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>        
            <TextField floatingLabelText='Observação'
              hintText='Digite a observação' fullWidth={true}/>
        </Dialog>
        <Table selectable={false}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={{width: '5%'}}>APTO</TableHeaderColumn>
              <TableHeaderColumn style={{width: '25%'}}>Paciente</TableHeaderColumn>
              <TableHeaderColumn style={{width: '20%'}}>Médico</TableHeaderColumn>
              <TableHeaderColumn style={{width: '10%'}}>Convênio</TableHeaderColumn>
              <TableHeaderColumn style={{width: '40%'}}>Observação</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pacientes.map((paciente) => this.renderRow(paciente))}
          </TableBody>
        </Table>
      </div>
    </MuiThemeProvider>
    );
  }
}

function mapStateToProps (state) {
  const { pacientesByUnidade, selectedUnidade} = state;
  const {isFetching, lastUpdated, items: pacientes} = pacientesByUnidade[selectedUnidade] || {
    isFetching: true,
    items: []
  };

  return {
    selectedUnidade,
    pacientes,
    isFetching,
    lastUpdated};
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(PacienteActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Observacao);

