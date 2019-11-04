import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './driver.reducer';
import { IDriver } from 'app/shared/model/driver.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DriverDetail extends React.Component<IDriverDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { driverEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="uterApp.driver.detail.title">Driver</Translate> [<b>{driverEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="uterApp.driver.name">Name</Translate>
              </span>
            </dt>
            <dd>{driverEntity.name}</dd>
            <dt>
              <span id="surName">
                <Translate contentKey="uterApp.driver.surName">Sur Name</Translate>
              </span>
            </dt>
            <dd>{driverEntity.surName}</dd>
            <dt>
              <span id="license">
                <Translate contentKey="uterApp.driver.license">License</Translate>
              </span>
            </dt>
            <dd>{driverEntity.license}</dd>
          </dl>
          <Button tag={Link} to="/entity/driver" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/driver/${driverEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ driver }: IRootState) => ({
  driverEntity: driver.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriverDetail);
