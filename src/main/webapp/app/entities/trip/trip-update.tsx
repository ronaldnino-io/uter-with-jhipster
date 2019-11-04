import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDriver } from 'app/shared/model/driver.model';
import { getEntities as getDrivers } from 'app/entities/driver/driver.reducer';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { getEntities as getVehicles } from 'app/entities/vehicle/vehicle.reducer';
import { getEntity, updateEntity, createEntity, reset } from './trip.reducer';
import { ITrip } from 'app/shared/model/trip.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITripUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITripUpdateState {
  isNew: boolean;
  driverId: string;
  vehicleId: string;
}

export class TripUpdate extends React.Component<ITripUpdateProps, ITripUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      driverId: '0',
      vehicleId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getDrivers();
    this.props.getVehicles();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { tripEntity } = this.props;
      const entity = {
        ...tripEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/trip');
  };

  render() {
    const { tripEntity, drivers, vehicles, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="uterApp.trip.home.createOrEditLabel">
              <Translate contentKey="uterApp.trip.home.createOrEditLabel">Create or edit a Trip</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : tripEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="trip-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="trip-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateLabel" for="trip-date">
                    <Translate contentKey="uterApp.trip.date">Date</Translate>
                  </Label>
                  <AvField id="trip-date" type="date" className="form-control" name="date" />
                </AvGroup>
                <AvGroup>
                  <Label for="trip-driver">
                    <Translate contentKey="uterApp.trip.driver">Driver</Translate>
                  </Label>
                  <AvInput id="trip-driver" type="select" className="form-control" name="driver.id">
                    <option value="" key="0" />
                    {drivers
                      ? drivers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="trip-vehicle">
                    <Translate contentKey="uterApp.trip.vehicle">Vehicle</Translate>
                  </Label>
                  <AvInput id="trip-vehicle" type="select" className="form-control" name="vehicle.id">
                    <option value="" key="0" />
                    {vehicles
                      ? vehicles.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/trip" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  drivers: storeState.driver.entities,
  vehicles: storeState.vehicle.entities,
  tripEntity: storeState.trip.entity,
  loading: storeState.trip.loading,
  updating: storeState.trip.updating,
  updateSuccess: storeState.trip.updateSuccess
});

const mapDispatchToProps = {
  getDrivers,
  getVehicles,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripUpdate);
