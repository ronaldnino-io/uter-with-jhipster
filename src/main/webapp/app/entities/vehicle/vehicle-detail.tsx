import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle.reducer';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class VehicleDetail extends React.Component<IVehicleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { vehicleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="uterApp.vehicle.detail.title">Vehicle</Translate> [<b>{vehicleEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="brand">
                <Translate contentKey="uterApp.vehicle.brand">Brand</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.brand}</dd>
            <dt>
              <span id="model">
                <Translate contentKey="uterApp.vehicle.model">Model</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.model}</dd>
            <dt>
              <span id="plate">
                <Translate contentKey="uterApp.vehicle.plate">Plate</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.plate}</dd>
            <dt>
              <span id="licenseRequired">
                <Translate contentKey="uterApp.vehicle.licenseRequired">License Required</Translate>
              </span>
            </dt>
            <dd>{vehicleEntity.licenseRequired}</dd>
          </dl>
          <Button tag={Link} to="/entity/vehicle" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/vehicle/${vehicleEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ vehicle }: IRootState) => ({
  vehicleEntity: vehicle.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VehicleDetail);
