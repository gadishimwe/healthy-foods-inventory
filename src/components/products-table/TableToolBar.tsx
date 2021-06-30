import React from 'react'
import { Button, createStyles, makeStyles, Theme, Toolbar, Typography, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    title: {
      flex: '1 1 100%'
    }
  })
)
interface TableToolbarProps {
  numSelected: number
}

const TableToolbar: React.FC<TableToolbarProps> = ({ numSelected }) => {
  const classes = useToolbarStyles()

  return (
    <Toolbar className={classes.root}>
      <IconButton disabled={numSelected <= 0}>
        <MenuIcon />
      </IconButton>
      <div className={classes.title}>
        {numSelected > 0 && (
          <Typography color="inherit" variant="subtitle1" component="div">
            {numSelected} products selected
          </Typography>
        )}
      </div>
      <Button variant="contained" style={{ minWidth: numSelected === 2 ? 200 : 300 }} disabled={numSelected !== 2}>
        {numSelected === 2 ? 'Compare products' : 'Select 2 products to compare'}
      </Button>
    </Toolbar>
  )
}

export default TableToolbar
