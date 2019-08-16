import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout} from './layouts';
import { connect } from 'react-redux'

import {
  AccountPage as AccountPageView,
  Payment as PaymentView,
  Products as ProductsView,
  Home as HomeView,
  EmailTemplates as EmailTemplatesView,
  EmailForm as EmailFormView,
  AdminUser as AdminUserView,
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView

} from './views';

const Routes = () => {
  return (
    <Switch>

      <RouteWithLayout
        component={HomeView}
        exact
        layout={MainLayout}
        path="/"
      />
      <RouteWithLayout
        component={AccountPageView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={AdminUserView}
        exact
        layout={MainLayout}
        path="/admin-user"
      />
      <RouteWithLayout
        component={PaymentView}
        exact
        layout={MainLayout}
        path="/payment"
      />
      <RouteWithLayout
        component={ProductsView}
        exact
        layout={MainLayout}
        path="/products-and-pricing"
      />
      <RouteWithLayout
        component={EmailFormView}
        exact
        layout={MainLayout}
        path="/mail-form/:mailId"
      />
      <RouteWithLayout
        component={EmailFormView}
        exact
        layout={MainLayout}
        path="/mail-form"
      />
      <RouteWithLayout
        component={EmailTemplatesView}
        exact
        layout={MainLayout}
        path="/email-templates"
      />

      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />

      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MainLayout}
        path="/sign-up/:mode"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MainLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MainLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};


const mapStateToProps = ({ user }) => ({
  isLoggedIn: user.isLoggedIn
})


const mapDispatchToProps = dispatch => {
  return {
   
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes)