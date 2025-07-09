import { createBug } from '../../src/controllers/bugController.js';

describe('createBug controller (unit)', () => {
  it('should return 201 if bug is created successfully', async () => {
    const mockCreate = jest.fn().mockResolvedValue({
      title: 'Test Bug',
      description: 'This is a test',
    });

    // Create a mock Bug model
    const mockBugModel = { create: mockCreate };

    // Mock req and res
    const req = {
      body: {
        title: 'Test Bug',
        description: 'This is a test',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller with injected mock model
    const handler = createBug(mockBugModel);
    await handler(req, res);

    expect(mockCreate).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      title: 'Test Bug',
      description: 'This is a test',
    });
  });
});
