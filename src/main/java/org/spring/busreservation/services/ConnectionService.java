package org.spring.busreservation.services;

import org.spring.busreservation.dto.ConnectionDto;

import java.util.List;

public interface ConnectionService {
    ConnectionDto addConnection(ConnectionDto connectionDto);
    ConnectionDto updateConnection(ConnectionDto connectionDto);
    List<ConnectionDto> getAllConnections();
    void deleteConnection(Long id);
}
