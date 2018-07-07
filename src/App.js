import React, {Component} from 'react';
import fetch from './util/fetch';
import SimpleTable from './components/Table';
import Menus from './components/Menus';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({});

class App extends Component {
    constructor(props) {
        super(props);
        this.generateCustomerTable = this.generateCustomerTable.bind(this);
        this.generateTransactionsTable = this.generateTransactionsTable.bind(this);
        this.generateCustomerInfoDialog = this.generateCustomerInfoDialog.bind(this);
        this.generateTranInfoDialog = this.generateTranInfoDialog.bind(this);
        this.generateDeleteDialog = this.generateDeleteDialog.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.changeTab = this.changeTab.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.state = {
            customerData: [],
            transactionData: [],
            tabIndex: 0,
            dialogTitle: '',
            formData: {},
            mode: 'default'
        }
    }

    static CUSTOMER_API_URL = '/demo/customers';
    static TRANSACTION_API_URL = '/demo/transactions';
    static MODE = {
        CREATE_CUSTOMER: 'createCustomer',
        UPDATE_CUSTOMER: 'updateCustomer',
        DELETE_CUSTOMER: 'deleteCustomer',
        CREATE_TRANSACTION: 'createTransaction',
        UPDATE_TRANSACTION: 'updateTransaction',
        DELETE_TRANSACTION: 'deleteTransaction'
    }

    async componentWillMount() {
        Promise.all([
            fetch('/demo/customers', {method: 'get'}),
            fetch('/demo/transactions', {method: 'get'}),
        ]).then((responses) => {
            this.setState({
                customerData: responses[0],
                transactionData: responses[1]
            })
        });

    }

    closeDialog(e) {
        this.setState({
            dialogTitle: '',
            formData: {},
            mode: 'default'
        })
    }

    openDialog(data, type) {
        let dialogTile = '';
        switch (type) {
            case App.MODE.CREATE_CUSTOMER:
                dialogTile = 'Create customer';
                break
            case App.MODE.UPDATE_CUSTOMER:
                dialogTile = 'Update customer';
                break;
            case App.MODE.DELETE_CUSTOMER:
                dialogTile = 'Delete customer';
                break
            case App.MODE.CREATE_TRANSACTION:
                dialogTile = 'Create transaction';
                break
            case App.MODE.UPDATE_TRANSACTION:
                dialogTile = 'Update transaction';
                break;
            case App.MODE.DELETE_TRANSACTION:
                dialogTile = 'Delete transaction';
                break
        }
        this.setState({
            dialogTitle: dialogTile,
            formData: data,
            mode: type
        })
    }

    changeTab(event, value) {
        this.setState({
            tabIndex: value
        })
    }

    inputChange = (name) => (event) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [name]: event.target.value,
            }
        });
    };

    generateCustomerInfoDialog() {
        return (<Dialog
            open={this.state.mode === App.MODE.CREATE_CUSTOMER || this.state.mode === App.MODE.UPDATE_CUSTOMER}
            onClose={this.closeDialog}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{this.state.dialogTitle}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    fullWidth
                    value={this.state.formData.firstName}
                    onChange={this.inputChange('firstName')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    fullWidth
                    value={this.state.formData.lastName}
                    onChange={this.inputChange('lastName')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="birthday"
                    label="Birthday"
                    fullWidth
                    type="date"
                    defaultValue="2018-07-06"
                    value={this.state.formData.birthday}
                    onChange={this.inputChange('birthday')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="country"
                    label="Country"
                    fullWidth
                    value={this.state.formData.country}
                    onChange={this.inputChange('country')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="accountNumber"
                    label="Account Number"
                    fullWidth
                    value={this.state.formData.accountNumber}
                    onChange={this.inputChange('accountNumber')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="amount"
                    label="Amount"
                    fullWidth
                    type="number"
                    value={this.state.formData.amount}
                    onChange={this.inputChange('amount')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="currency"
                    label="Currency"
                    fullWidth
                    value={this.state.formData.currency}
                    onChange={this.inputChange('currency')}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={(e) => {
                    if (this.state.mode === App.MODE.CREATE_CUSTOMER) {
                        this.create('customer');
                    } else {
                        this.update('customer');
                    }
                }} color="primary">
                    {this.state.mode === App.MODE.CREATE_CUSTOMER && 'Create'}
                    {this.state.mode === App.MODE.UPDATE_CUSTOMER && 'Update'}
                </Button>
            </DialogActions>
        </Dialog>)
    }

    generateTranInfoDialog() {
        return (<Dialog
            open={this.state.mode === App.MODE.CREATE_TRANSACTION || this.state.mode === App.MODE.UPDATE_TRANSACTION}
            onClose={this.closeDialog}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{this.state.dialogTitle}</DialogTitle>
            <DialogContent>
                <FormControl style={{width: '100%'}}>
                    <InputLabel htmlFor="customerId">Customer</InputLabel>
                    <Select
                        value={this.state.formData.customerId || ''}
                        onChange={this.inputChange('customerId')}
                        inputProps={{
                            name: 'customerId',
                            id: 'customerId',
                        }}
                    >
                        {
                            this.state.customerData.map((customer) => <MenuItem value={customer.id}>{customer.firstName} {customer.lastName}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <TextField
                    autoFocus
                    margin="dense"
                    id="tranAmount"
                    label="Transaction amount"
                    fullWidth
                    type="number"
                    defaultValue="2018-07-06"
                    value={this.state.formData.tranAmount}
                    onChange={this.inputChange('tranAmount')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="tranCurrency"
                    label="Transaction currency"
                    fullWidth
                    value={this.state.formData.tranCurrency}
                    onChange={this.inputChange('tranCurrency')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="fromAccount"
                    label="From account"
                    fullWidth
                    value={this.state.formData.fromAccount}
                    onChange={this.inputChange('fromAccount')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="toAccount"
                    label="To account"
                    fullWidth
                    value={this.state.formData.toAccount}
                    onChange={this.inputChange('toAccount')}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="tranDay"
                    label="Transaction Day"
                    fullWidth
                    defaultValue='2018-07-07'
                    value={this.state.formData.tranDay}
                    type="date"
                    onChange={this.inputChange('tranDay')}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={(e) => {
                    if (this.state.mode === App.MODE.CREATE_TRANSACTION) {
                        this.create('transaction');
                    } else {
                        this.update('transaction');
                    }
                }} color="primary">
                    {this.state.mode === App.MODE.CREATE_TRANSACTION && 'Create'}
                    {this.state.mode === App.MODE.UPDATE_TRANSACTION && 'Update'}
                </Button>
            </DialogActions>
        </Dialog>)
    }

    generateDeleteDialog() {
        return (<Dialog
            open={this.state.mode === App.MODE.DELETE_TRANSACTION || this.state.mode === App.MODE.DELETE_CUSTOMER}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{this.state.dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {this.state.mode === App.MODE.DELETE_CUSTOMER && `Are you sure to delete customer ${this.state.formData.fisrtName}?`}
                    {this.state.mode === App.MODE.DELETE_TRANSACTION && `Are you sure to delete transaction ${this.state.formData.id}?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={(e) => {
                    if (this.state.mode === App.MODE.DELETE_CUSTOMER) {
                        this.delete('customer');
                    } else {
                        this.delete('transaction');
                    }
                }} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>)
    }

    generateCustomerTable() {
        const tableData = this.state.customerData.map((customer) => {
            const cells = [];
            cells.push(`${customer.firstName} ${customer.lastName}`);
            cells.push(customer.accountNumber);
            cells.push(customer.amount);
            cells.push(customer.currency);
            cells.push(customer.country);
            cells.push(customer.birthday);
            cells.push(<Menus options={[
                {
                    value: 'Create',
                    onClick: (e) => {
                        this.openDialog({}, App.MODE.CREATE_CUSTOMER)
                    },
                },
                {
                    value: 'Update',
                    onClick: (e) => {
                        this.openDialog(customer, App.MODE.UPDATE_CUSTOMER)
                    },
                },
                {
                    value: 'Delete',
                    onClick: (e) => {
                        this.openDialog(customer, App.MODE.DELETE_CUSTOMER)
                    },
                }
            ]}/>)
            return cells;
        })
        const tableHeaders = ['Customer Name',
            'Account', 'Amount',
            'Currency', 'country', 'Birthday', 'Actions'];
        return <SimpleTable data={tableData} tableHeaders={tableHeaders}/>
    }

    generateTransactionsTable() {
        const customerData = this.state.customerData;
        const tableData = this.state.transactionData.map((transaction) => {
            const customer = customerData.find((customer) => customer.id === transaction.customerId);
            const cells = [];
            cells.push(customer ? `${customer.firstName} ${customer.lastName}` : '');
            cells.push(transaction.fromAccount);
            cells.push(transaction.toAccount);
            cells.push(transaction.tranAmount);
            cells.push(transaction.tranCurrency);
            cells.push(transaction.tranDay);
            cells.push(<Menus options={[
                {
                    value: 'Create',
                    onClick: (e) => {
                        this.openDialog({}, App.MODE.CREATE_TRANSACTION)
                    },
                },
                {
                    value: 'Update',
                    onClick: (e) => {
                        this.openDialog(transaction, App.MODE.UPDATE_TRANSACTION)
                    },
                },
                {
                    value: 'Delete',
                    onClick: (e) => {
                        this.openDialog(transaction, App.MODE.DELETE_TRANSACTION)
                    },
                }
            ]}/>)
            return cells;
        })
        const tableHeaders = ['Customer Name',
            'From Account', 'To Account',
            'Amount', 'Currency', 'Transaction Day', 'Actions'];
        return <SimpleTable data={tableData} tableHeaders={tableHeaders}/>
    }

    create(type) {
        if (type === 'customer') {
            fetch(App.CUSTOMER_API_URL, {
                method: 'POST',
                body: JSON.stringify(this.state.formData)
            }).then((respose) => {
                this.closeDialog();
                fetch('/demo/customers', {method: 'get'}).then((response) => {
                    this.setState({
                        customerData: response,
                    })
                });
            }).catch((e) => {
                console.log(e)
            });
        } else {
            fetch(App.TRANSACTION_API_URL, {
                method: 'POST',
                body: JSON.stringify(this.state.formData)
            }).then((respose) => {
                this.closeDialog();
                fetch('/demo/transactions', {method: 'get'}).then((response) => {
                    this.setState({
                        transactionData: response,
                    })
                });
            }).catch((e) => {
                console.log(e)
            });
        }
    }

    update(type) {
        if (type === 'customer') {
            fetch(App.CUSTOMER_API_URL + `/${this.state.formData.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state.formData)
            }).then((respose) => {
                this.closeDialog();
                fetch('/demo/customers', {method: 'get'}).then((response) => {
                    this.setState({
                        customerData: response,
                    })
                });
            }).catch((e) => {
                console.log(e)
            });
        } else {
            fetch(App.TRANSACTION_API_URL + `/${this.state.formData.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state.formData)
            }).then((respose) => {
                this.closeDialog();
                fetch('/demo/transactions', {method: 'get'}).then((response) => {
                    this.setState({
                        transactionData: response,
                    })
                });
            }).catch((e) => {
                console.log(e)
            });
        }
    }

    delete(type) {
        if (type === 'customer') {
            fetch(App.CUSTOMER_API_URL + `/${this.state.formData.id}`, {
                method: 'DELETE'
            }).then((respose) => {
                this.closeDialog();
                fetch('/demo/customers', {method: 'get'}).then((response) => {
                    this.setState({
                        customerData: response,
                    })
                });
            }).catch((e) => {
                console.log(e)
            });
        } else {
            fetch(App.TRANSACTION_API_URL + `/${this.state.formData.id}`, {
                method: 'DELETE',
                body: JSON.stringify(this.state.formData)
            }).then((respose) => {
                this.closeDialog();
                fetch('/demo/transactions', {method: 'get'}).then((response) => {
                    this.setState({
                        transactionData: response,
                    })
                });
            }).catch((e) => {
                console.log(e)
            });
        }
    }

    render() {
        return (
            <div className="App">
                <AppBar>
                    <Tabs value={this.state.tabIndex} onChange={this.changeTab}>
                        <Tab label="Customers"/>
                        <Tab label="Transactions"/>
                    </Tabs>
                </AppBar>
                {
                    this.state.tabIndex === 0 &&
                    <div style={{padding: 24}}>
                        {this.generateCustomerTable()}
                    </div>
                }
                {
                    this.state.tabIndex === 1 &&
                    <div style={{padding: 24}}>
                        {this.generateTransactionsTable()}
                    </div>
                }
                {this.generateCustomerInfoDialog()}
                {this.generateTranInfoDialog()}
                {this.generateDeleteDialog()};
            </div>
        );
    }
}

export default withStyles(styles)(App);
