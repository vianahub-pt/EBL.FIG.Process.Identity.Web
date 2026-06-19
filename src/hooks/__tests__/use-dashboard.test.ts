import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useDashboard } from '../use-dashboard';

jest.mock('@tanstack/react-query');

describe('useDashboard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return default values when response is incomplete', () => {
    // Mock useQuery with incomplete response
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        usersCount: 42,
        appsStatus: null, // null value
        rolesCount: undefined, // undefined value
        actionsCount: 156,
        resourcesCount: 73,
        appsCount: 5,
        tenantsCount: 3,
        rolePermissionsCount: 524,
        userRolesCount: 127,
      },
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { result } = renderHook(() => useDashboard());

    // Verify defaults are applied
    expect(result.current.usersCount).toBe(42);
    expect(result.current.rolesCount).toBe(0); // undefined -> 0
    expect(result.current.appsStatus).toEqual([]); // null -> []
    expect(result.current.actionsCount).toBe(156);
    expect(result.current.resourcesCount).toBe(73);
    expect(result.current.appsCount).toBe(5);
    expect(result.current.tenantsCount).toBe(3);
    expect(result.current.rolePermissionsCount).toBe(524);
    expect(result.current.userRolesCount).toBe(127);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should return refetch function from React Query', () => {
    const mockRefetch = jest.fn();
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        usersCount: 42,
        usersStatus: [],
        rolesCount: 8,
        actionsCount: 156,
        resourcesCount: 73,
        appsCount: 5,
        appsStatus: [{ id: 1, isActive: true }],
        tenantsCount: 3,
        rolePermissionsCount: 524,
        userRolesCount: 127,
      },
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    });

    const { result } = renderHook(() => useDashboard());

    expect(result.current.refetch).toBe(mockRefetch);
  });

  it('should handle error state correctly', () => {
    const mockError = new Error('API Error');
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: mockError,
      refetch: jest.fn(),
    });

    const { result } = renderHook(() => useDashboard());

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe(mockError);
    expect(result.current.usersCount).toBe(0); // default when no data
    expect(result.current.appsStatus).toEqual([]); // default when no data
  });
});
