// export default React.memo(TheContent);
import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer } from "@coreui/react";

// routes config
import routes from "../routes";
import { getUser } from "src/components/util/Common";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={true}
                    name={route.name}
                    render={(props) =>
                      getUser() !== null ? (
                        <route.component {...props} />
                      ) : (
                        <Redirect to={{ pathname: "/login" }} />
                      )
                    }
                  />
                )
              );
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
