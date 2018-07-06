import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class SimpleTable extends React.Component {
    render() {
        const {classes, data, tableHeaders} = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {
                                tableHeaders.map((header) => {
                                    return (
                                        <TableCell style={{fontWeight: 'bold'}}>{header}</TableCell>
                                    );
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, rowIndex) => {
                            return (
                                <TableRow hover key={rowIndex}>
                                    {
                                        row.map((cell, cellIndex) => {
                                           return(<TableCell key={cellIndex}>{cell}</TableCell>)
                                        })
                                    }
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
};


SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    tableHeaders: PropTypes.array.isRequired
};

export default withStyles(styles)(SimpleTable);