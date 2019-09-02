import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithLayout } from './components';
import { Main as MainLayout} from './layouts';
import { connect } from 'react-redux';
import { history } from './store';
import {
  Recipients as RecipientsView,
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
  NotFound as NotFoundView,
  RecipientProps as RecipientPropsView
} from './views';


const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout component={HomeView} exact layout={MainLayout} path="/" />
      <RouteWithLayout component={SignUpView} exact layout={MainLayout} path="/sign-up/:mode/:price" />
      <RouteWithLayout component={SignInView} exact layout={MainLayout} path="/sign-in" />
      <RouteWithLayout component={ProductsView} exact layout={MainLayout} path="/products-and-pricing" />
      <RouteWithLayout component={ProductsView} exact layout={MainLayout} path="/create-an-account" />
      <RouteWithLayout component={ProductsView} exact layout={MainLayout} path="/contact" />

      <RouteWithLayout component={DashboardView} exact layout={MainLayout} path="/dashboard" auth="'user'" />
      <RouteWithLayout component={AccountPageView} exact layout={MainLayout} path="/account" auth="'user'" />
      <RouteWithLayout component={RecipientPropsView} exact layout={MainLayout} path="/recipient-props" auth="'user'" />
      <RouteWithLayout component={RecipientsView} exact layout={MainLayout} path="/recipients" auth="'user'" />
      <RouteWithLayout component={PaymentView} exact layout={MainLayout} path="/payment" auth="'user'" />
      <RouteWithLayout component={EmailFormView} exact layout={MainLayout} auth="'user'" path="/mail-form/:mailId" />
      <RouteWithLayout component={EmailFormView} exact layout={MainLayout} path="/mail-form" auth="'user'" />
      <RouteWithLayout component={EmailTemplatesView} exact layout={MainLayout} path="/email-templates" auth="'user'" />
      <RouteWithLayout component={UserListView} exact layout={MainLayout} path="/users" auth="'user'" />
      <RouteWithLayout component={ProductListView} exact layout={MainLayout} path="/products" auth="'user'" />
      <RouteWithLayout component={TypographyView} exact layout={MainLayout} path="/typography" auth="'user'" />
      <RouteWithLayout component={IconsView} exact layout={MainLayout} path="/icons" auth="'user'" />
      <RouteWithLayout component={SettingsView} exact layout={MainLayout} path="/settings" auth="'user'" />

      <RouteWithLayout component={AdminUserView} exact layout={MainLayout} path="/admin-user" auth="'user'" />

      <RouteWithLayout component={NotFoundView} exact layout={MainLayout} path="/not-found" />
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