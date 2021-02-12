import React from "react";
import styled from "styled-components/macro";

import {
  Grid,
  Hidden,
  List,
  ListItemText as MuiListItemText,
  ListItem as MuiListItem,
} from "@material-ui/core";

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(1) / 4}px
    ${(props) => props.theme.spacing(4)}px;
  background: ${(props) => props.theme.footer.background};
  position: relative;
`;

const ListItem = styled(MuiListItem)`
  display: inline-block;
  width: auto;
  padding-left: ${(props) => props.theme.spacing(2)}px;
  padding-right: ${(props) => props.theme.spacing(2)}px;
  &,
  &:hover,
  &:active {
    color: #ff0000;
  }
`;

const ListItemText = styled(MuiListItemText)`
  span {
    color: ${(props) => props.theme.footer.color};
  }
`;

function Footer() {
  return (
    <Wrapper style={{ borderTop: '1px solid black' }}>
      <Grid container spacing={0} >
        <Hidden smDown>
          <Grid container item xs={12} md={6} >

          </Grid>
        </Hidden>
        <Grid container item xs={12} md={6} justify="flex-end">
          <List>
            <ListItem button={true} component="a" href="/pages/contacto">
              <ListItemText
                primary="CONTACTANOS "
              />
              <ListItemText
                primary="info@frdirect.com"
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Footer;
