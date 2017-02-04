package org.spring.busreservation.services;

import org.spring.busreservation.dao.ConnectionRepository;
import org.spring.busreservation.domain.Connection;
import org.spring.busreservation.dto.ConnectionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ConnectionServiceImpl implements ConnectionService {
    @Autowired
    private ConnectionRepository connectionRepository;

    @Override
    public ConnectionDto addConnection(ConnectionDto connectionDto) {
        Connection connection = mapDtoToConnection(connectionDto);
        connection.setId(null);
        connection = connectionRepository.save(connection);
        return mapConnectionToDto(connection);
    }

    @Override
    public ConnectionDto updateConnection(ConnectionDto connectionDto) {
        Connection connection = mapDtoToConnection(connectionDto);
        connection = connectionRepository.save(connection);
        return mapConnectionToDto(connection);
    }

    @Override
    public List<ConnectionDto> getAllConnections() {
        List<Connection> connections = connectionRepository.findAll();
        List<ConnectionDto> dtos = new ArrayList<>();
        for (Connection connection : connections) {
            dtos.add(mapConnectionToDto(connection));
        }

        return dtos;
    }

    @Override
    public void deleteConnection(Long id) {
        connectionRepository.delete(id);
    }

    private Connection mapDtoToConnection(ConnectionDto connectionDto) {
        Connection connection = new Connection();
        connection.setId(connectionDto.getId());
        connection.setArrivalDate(connectionDto.getArrivalDate());
        connection.setDepartureDate(connectionDto.getDepartureDate());
        connection.setDistance(connectionDto.getDistance());
        connection.setStartPlace(connectionDto.getStartPlace());
        connection.setEndPlace(connectionDto.getEndPlace());
        connection.setPlaces(connectionDto.getPlaces());

        return connection;
    }

    private ConnectionDto mapConnectionToDto(Connection connection) {
        ConnectionDto connectionDto = new ConnectionDto();
        connectionDto.setId(connection.getId());
        connectionDto.setArrivalDate(connection.getArrivalDate());
        connectionDto.setDepartureDate(connection.getDepartureDate());
        connectionDto.setDistance(connection.getDistance());
        connectionDto.setStartPlace(connection.getStartPlace());
        connectionDto.setEndPlace(connection.getEndPlace());
        connectionDto.setPlaces(connection.getPlaces());
        connectionDto.setTakenPlaces(connection.getTickets() != null ? connection.getTickets().size() : 0);

        return connectionDto;
    }
}
